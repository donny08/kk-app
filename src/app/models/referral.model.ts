
export interface IFriend {
    id: string,
    index: number,
    name: string,
    mobileNo: string,
    status: number,
    animate: string
}

export interface IStatisticsData {
    data: IStatistics,
    show: boolean
}

export interface IStatistics {
    success: number,
    failure: number
}