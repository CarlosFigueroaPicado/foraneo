import { supabase } from './supabaseClient';

export type SubscriptionTier = 'free' | 'pro';

export interface UserProfile {
  id: string;
  subscription_tier: SubscriptionTier;
}

export const subscriptionService = {
  async getUserSubscriptionTier(userId: string): Promise<SubscriptionTier> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error obteniendo tier de suscripción:', error);
        return 'free';
      }

      return (data?.subscription_tier as SubscriptionTier) || 'free';
    } catch (error) {
      console.error('Error en getUserSubscriptionTier:', error);
      return 'free';
    }
  },

  async updateSubscriptionTier(
    userId: string,
    tier: SubscriptionTier
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_tier: tier })
        .eq('id', userId);

      if (error) {
        console.error('Error actualizando tier de suscripción:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error en updateSubscriptionTier:', error);
      return false;
    }
  },

  async checkHasProAccess(userId: string | null): Promise<boolean> {
    if (!userId) return false;

    const tier = await this.getUserSubscriptionTier(userId);
    return tier === 'pro';
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  },
};
