import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetSpecifiedUserPermission,
  useAllPermissions,
} from "@/lib/react-query/query/usePermissions";
import { LoadingSpinner } from "../ui/loading-spinner";
import usePermissions from "@/lib/react-query/mutations/usePermission";

interface IEditPermission {
  onGoBack: () => void;
  userId: string;
}

const AdminEditUserPermission = ({ onGoBack, userId }: IEditPermission) => {
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [initialPermissions, setInitialPermissions] = useState<string[]>([]);
  const { data, isLoading: isLoadingSpecifiedUserPermission } =
    useGetSpecifiedUserPermission(userId);

  const { data: allPermissions, isLoading: isLoadingAllPermissions } =
    useAllPermissions();

  const { updateUserPermissionMutation } = usePermissions();
  const isUpdatingPermission = updateUserPermissionMutation.isPending;

  useEffect(() => {
    if (data?.permissions) {
      setUserPermissions(data.permissions);
      setInitialPermissions(data.permissions);
    }
  }, [data]);

  const permissionCategories = useMemo(() => {
    const allUserPermission = allPermissions?.allPermissions ?? [];
    if (!allUserPermission) return {};

    const categories: Record<string, { id: string; label: string }[]> = {};

    allUserPermission.forEach((permission: string) => {
      const [category, action] = permission.split(".");
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({
        id: permission,
        label: `Can ${action.replace(/([A-Z])/g, " $1").toLowerCase()}`,
      });
    });

    return categories;
  }, [allPermissions]);

  const handlePermissionChange = (permission: string) => {
    setUserPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const updatePermissions = () => {
    const addUserPermission = userPermissions.filter(
      (permission) => !initialPermissions.includes(permission)
    );
    const removeUserPermission = initialPermissions.filter(
      (permission) => !userPermissions.includes(permission)
    );

    updateUserPermissionMutation.mutate(
      {
        userId,
        addPermission: addUserPermission,
        removePermission: removeUserPermission,
      },
      {
        onSuccess: () => {
          onGoBack();
        },
      }
    );
  };

  if (isLoadingSpecifiedUserPermission || isLoadingAllPermissions) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-40" />
        </div>

        {Array.from({ length: 3 }).map((_, categoryIndex) => (
          <div key={categoryIndex} className="space-y-2">
            <Skeleton className="h-6 w-40" />
            {Array.from({ length: 4 }).map((_, permissionIndex) => (
              <div
                key={permissionIndex}
                className="flex items-center space-x-2 "
              >
                <Skeleton className="h-4 w-4 rounded-sm mt-5" />
                <Skeleton className="h-4 w-32 mt-5" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onGoBack} variant="secondary" className="p-0">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold">Go Back</h2>
      </div>

      {Object.entries(permissionCategories).map(([category, permissions]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold capitalize">{category}</h3>
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                className="rounded-sm data-[state=checked]:rounded-lg"
                id={permission.id}
                checked={userPermissions.includes(permission.id)}
                onCheckedChange={() => handlePermissionChange(permission.id)}
              />
              <label
                htmlFor={permission.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {permission.label}
              </label>
            </div>
          ))}
        </div>
      ))}

      <Button
        onClick={updatePermissions}
        className="bg-verido-green text-verido-white w-[10rem]"
      >
        {isUpdatingPermission ? <LoadingSpinner /> : "Update Permission"}
      </Button>
    </div>
  );
};

export default AdminEditUserPermission;
