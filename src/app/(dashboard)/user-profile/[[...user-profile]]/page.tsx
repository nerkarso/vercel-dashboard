'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/trpc/client';
import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Triangle } from 'lucide-react';
import { Suspense } from 'react';
import { toast } from 'sonner';

export default function Page() {
  return (
    <UserProfile appearance={{ baseTheme: dark }} path="/user-profile" routing="path">
      <UserProfile.Page
        label="Vercel Accounts"
        labelIcon={<Triangle height={16} width={16} />}
        url="/vercel-accounts"
      >
        <header className="border-b border-border pb-4 mb-6">
          <h1 className="font-bold text-lg">Vercel accounts</h1>
        </header>
        <Suspense fallback={null}>
          <VercelAccountsPageContent />
        </Suspense>
      </UserProfile.Page>
    </UserProfile>
  );
}

type Account = { id: string; name: string; token: string };
const accountPlaceholder = { id: '', name: '', token: '' };

function VercelAccountsPageContent() {
  const queryClient = useQueryClient();

  const [allAccounts] = api.user.vercelAccount.getAll.useSuspenseQuery<Account[]>();
  const createMutation = api.user.vercelAccount.create.useMutation();
  const updateMutation = api.user.vercelAccount.update.useMutation();
  const deleteMutation = api.user.vercelAccount.delete.useMutation();

  const defaultQueryOptions = {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };
  // @ts-expect-error query options are not typed
  const { data: accounts } = useQuery({
    queryKey: ['vercel-accounts'],
    queryFn: () => Promise.resolve<Account[]>([]),
    initialData: allAccounts,
    ...defaultQueryOptions,
  });
  // @ts-expect-error query options are not typed
  const { data: currentAccount } = useQuery({
    queryKey: ['vercel-account'],
    queryFn: () => Promise.resolve(accountPlaceholder),
    initialData: accountPlaceholder,
    ...defaultQueryOptions,
  });
  // @ts-expect-error query options are not typed
  const { data: isEditing } = useQuery({
    queryKey: ['vercel-account-editing'],
    queryFn: () => Promise.resolve(false),
    initialData: false,
    ...defaultQueryOptions,
  });

  const handleAddOrEditAccount = async () => {
    if (currentAccount.name === '') {
      toast.error('Name is required');
      return;
    }
    if (currentAccount.token === '') {
      toast.error('Token is required');
      return;
    }
    if (isEditing) {
      queryClient.setQueryData(
        ['vercel-accounts'],
        accounts.map((acc) => (acc.id === currentAccount.id ? currentAccount : acc))
      );
      // Update account
      updateMutation.mutate(currentAccount);
    } else {
      if (accounts.some((acc) => acc.name === currentAccount.name)) {
        toast.error('Account with this name already exists');
        return;
      }
      if (accounts.some((acc) => acc.token === currentAccount.token)) {
        toast.error('Account with this token already exists');
        return;
      }
      const newAccount = { ...currentAccount, id: Math.random().toString(36).substring(2, 8) };
      queryClient.setQueryData(['vercel-accounts'], [...accounts, newAccount]);
      // Create account
      createMutation.mutate(newAccount);
    }
    queryClient.setQueryData(['vercel-account'], accountPlaceholder);
    queryClient.setQueryData(['vercel-account-editing'], false);
  };

  const handleEdit = (account: Account) => {
    queryClient.setQueryData(['vercel-account'], account);
    queryClient.setQueryData(['vercel-account-editing'], true);
  };

  const handleDelete = (id: string) => {
    queryClient.setQueryData(
      ['vercel-accounts'],
      accounts.filter((acc) => acc.id !== id)
    );
    // Delete account
    deleteMutation.mutate(id);
  };

  const handleCancel = () => {
    queryClient.setQueryData(['vercel-account'], accountPlaceholder);
    queryClient.setQueryData(['vercel-account-editing'], false);
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row">
          <Input
            placeholder="Name"
            value={currentAccount.name}
            onChange={(e) =>
              queryClient.setQueryData<Account>(['vercel-account'], {
                ...currentAccount,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Token"
            value={currentAccount.token}
            onChange={(e) =>
              queryClient.setQueryData<Account>(['vercel-account'], {
                ...currentAccount,
                token: e.target.value,
              })
            }
          />
        </div>
        <div className="flex space-x-2 mt-3">
          <Button onClick={handleAddOrEditAccount}>
            {isEditing ? 'Save changes' : 'Add account'}
          </Button>
          {isEditing && (
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
      <ul className="divide-y divide-border">
        {accounts.map((account) => (
          <li key={account.id} className="flex justify-between items-center py-3">
            <div className="grid grid-cols-1 flex-1 sm:grid-cols-2 gap-1">
              <span className="text-sm">{account.name}</span>
              <span className="text-sm font-mono">{account.token}</span>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleEdit(account)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(account.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
