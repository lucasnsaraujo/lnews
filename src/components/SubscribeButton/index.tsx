import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import styles from './styles.module.scss'


interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const {data: session, status} = useSession();
    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }
        try {
            const response = await api.post('/subscribe')
            const { sessionId } = response.data
        } catch {
            return;
        }
    }
    return (
        <button type="button" className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}