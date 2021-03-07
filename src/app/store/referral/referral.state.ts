import { IStatisticsData, IFriend } from '../../models/referral.model';

export class ReferralState {
    statistics: IStatisticsData = { data: null, show: false };
    token: string = null;
    filter: string = 'ALL';
    campaignCode: string = null;
    referee: string = null;
}