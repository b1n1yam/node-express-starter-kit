import { NoDataError } from '@core/ApiError';
import { Types } from 'mongoose';

import { Permissions, PermissionsModel } from './permissions.model';

const createPermissions = async (
    permission: Pick<Permissions, 'actions' | 'resource'>
): Promise<Permissions> => {
    const newPermission = await PermissionsModel.create(permission);
    return newPermission;
};

const updatedPermissions = async ({
    actions,
    resource,
    _id
}: Pick<
    Permissions,
    'actions' | 'resource' | '_id'
>): Promise<Permissions | null> => {
    const updatedPermissions = await PermissionsModel.findByIdAndUpdate(
        _id,
        { actions, resource },
        { new: true }
    )
        .lean()
        .exec();
    return updatedPermissions;
};

const findPermissionById = async (
    id: Types.ObjectId
): Promise<Permissions | null> => {
    const permission = await PermissionsModel.findOne({ _id: id })
        .lean()
        .exec();
    if (!permission) throw new NoDataError('no');
    return permission;
};

const findAllPermissionsById = async (
    ids: Types.ObjectId[]
): Promise<Permissions[]> => {
    const permissions = await PermissionsModel.find({ _id: { $in: ids } })
        .lean()
        .exec();
    return permissions;
};
const getAllPermissions = async (): Promise<Permissions[]> => {
    const permissions = await PermissionsModel.find();
    return permissions;
};

const deletePermissionByID = async (ids: Types.ObjectId[]): Promise<void> => {
    const result = await PermissionsModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
        throw new NoDataError(`No permission with id ${ids}`);
    }
};

export {
    createPermissions,
    updatedPermissions,
    findPermissionById,
    findAllPermissionsById,
    deletePermissionByID,
    getAllPermissions
};
