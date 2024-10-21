import {TeamType} from '@app/utils/types/TeamType';
import {Game} from '@app/utils/types/game';
import {ApiBase} from '@app/services/api/apiBase';
import {Page} from '@app/utils/types/page';

export class GameApi extends ApiBase {
  getQuickGamePagination = async (
    pageRequest: number,
    pageSize: number,
    teamType: TeamType,
  ): Promise<Page<Game>> => {
    const uri = `gameType=QUICK_GAME&gameProgress=MATCHING&latitude=2.3&longitude=3.4&pageRequest=${pageRequest}&pageSize=${pageSize}`;
    const response: any = this.executeRequest({uri, method: 'GET', requestBody: {}});
    return response;
  };
}
