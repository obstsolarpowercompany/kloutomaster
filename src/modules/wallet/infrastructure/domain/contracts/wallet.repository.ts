export interface IWalletRepository {
    listByUser(userId: string): Promise<any>;
}