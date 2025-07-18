         import React, { useState } from 'react';
import useApiMutation from '../api/hooks/useApiMutation';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useApiMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    mutate({
      url: '/api/admins/public/submit/newsletter',
      method: 'POST',
      data: { email },
      headers: true,
      onSuccess: (response) => {
        setIsLoading(false);
        setEmail('');
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Subscribe to newsletter"
        className="flex-1 px-3 py-2 text-sm border border-white/30 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-white/50"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 text-sm bg-mobiPink text-white rounded-md hover:bg-mobiPink/90 focus:outline-none disabled:opacity-50 transition-colors"
      >
        {isLoading ? '...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default NewsletterSubscription;
