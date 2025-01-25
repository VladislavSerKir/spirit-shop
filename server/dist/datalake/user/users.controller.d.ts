import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EditAvatarDto } from './dto/edit-avatar.dto';
import { AssignAdminDto } from './dto/assign-admin.dto';
import { ManageAccountDto } from './dto/manage-account.dto';
import { BasicUserInfoHiddenResponse, BasicUserInfoResponse, IHeadersAuthorizationRequest } from 'src/common/types/interfaces';
import { HideProfileDto } from './dto/hide-profile.dto';
import { GetStatisticsPeriodDto } from './dto/period-statistics.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfileInfo(user: User): Promise<User>;
    getShopStatisticsInfo(request: IHeadersAuthorizationRequest): any;
    getShopStatisticsPeriodInfo(request: IHeadersAuthorizationRequest, getStatisticsPeriodDto: GetStatisticsPeriodDto): any;
    getUsers(request: IHeadersAuthorizationRequest): Promise<User[]>;
    getBasicUserInfo(id: string, request: IHeadersAuthorizationRequest): Promise<BasicUserInfoResponse | BasicUserInfoHiddenResponse>;
    editProfile(request: IHeadersAuthorizationRequest, updateUserDto: UpdateUserDto): Promise<Partial<User>>;
    updateToken(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findUserInfo(findUserDto: FindUserDto): Promise<User[]>;
    editAvatar(request: IHeadersAuthorizationRequest, editAvatarDto: EditAvatarDto): Promise<Partial<User>>;
    manageAdmin(request: IHeadersAuthorizationRequest, assignAdminDto: AssignAdminDto): Promise<Partial<User>>;
    manageAccount(request: IHeadersAuthorizationRequest, manageAccountDto: ManageAccountDto): Promise<Partial<User>>;
    hideAccount(request: IHeadersAuthorizationRequest, hideProfileDto: HideProfileDto): Promise<Partial<User>>;
}
