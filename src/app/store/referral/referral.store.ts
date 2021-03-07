import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ReferralState } from './referral.state';
import { IStatistics } from '../../models/referral.model';

@Injectable()
export class ReferralStore extends Store<ReferralState> {
    constructor() {
        super(new ReferralState());
    }

    setToken(token: string, campaignCode: string): void {
        this.setState({
            ...this.state,
            token: token,
            campaignCode: campaignCode
        });
    }

    getToken() {
        return this.state.token;
    }

    getCampaignCode() {
        return this.state.campaignCode;
    }

    showAndUpdateStatistics(statistics: IStatistics): void {
        this.setState({
            ...this.state,
            statistics: { data: { ...statistics }, show: true }
        });
    }

    hideAndInitialiseStatistics(): void {
        this.setState({
            ...this.state,
            statistics: { data: null, show: false }
        });
    }

    updateFilter(filter: string): void {
        this.setState({
            ...this.state,
            filter: filter
        });
    }

    updateReferee(mobileNo: string): void {
        this.setState({
            ...this.state,
            referee: mobileNo
        });
    }

    getReferee() {
        return this.state.referee;
    }

    clearStore() {
        this.setState({
            ...this.state,
            statistics: { data: null, show: false },
            token: null,
            filter: 'ALL',
            campaignCode: null,
            referee: null
        });
    }
}