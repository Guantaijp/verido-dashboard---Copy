import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { columnsPermission } from "./permissionSettings/column";
import { columnsSpecificPermission } from "./specificUserPermission/column";
import { PermissionTable } from "./permissionSettings/permissionTable";
import {
  useUserPermissionMetrics,
  usePermissionByRole,
} from "@/lib/react-query/query/usePermissions";
import { transformPermissionData } from "./permissionSettings/column";
import SpecificUserTable from "./specificUserPermission/SpecificUserTable";
import AdminEditUserPermission from "./AdminEditUserPermission";

const PermissionsSettings = () => {
  const { data: metricsData, isLoading: isLoadingMetrics } =
    useUserPermissionMetrics();
  const [selectedUser, setSelectedUser] = React.useState<string>("");
  const [editPermissionId, setEditPermissionId] = React.useState<string>("");

  const { data: userRolePermission, isLoading: isLoadingPermissionByRole } =
    usePermissionByRole(selectedUser);

  const transformedData = metricsData
    ? transformPermissionData(metricsData)
    : [];
  const permissionByRole = userRolePermission ?? [];

  const handleGoBack = () => {
    setSelectedUser("");
    setEditPermissionId("");
  };

  const handleGoBackToSpecificUser = () => {
    setEditPermissionId("");
  };

  const handleEditPermission = (id: string) => {
    setEditPermissionId(id);
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        {editPermissionId ? (
          <motion.div
            key="edit-permission"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AdminEditUserPermission
              userId={editPermissionId}
              onGoBack={handleGoBackToSpecificUser}
            />
          </motion.div>
        ) : selectedUser ? (
          <motion.div
            key="specific-user"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SpecificUserTable
              columns={columnsSpecificPermission}
              data={permissionByRole}
              userRole={selectedUser}
              isFetching={isLoadingPermissionByRole}
              onGoBack={handleGoBack}
              onEditPermision={handleEditPermission}
            />
          </motion.div>
        ) : (
          <motion.div
            key="permission-table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PermissionTable
              data={transformedData}
              columns={columnsPermission}
              isFetching={isLoadingMetrics}
              onUserSelect={setSelectedUser}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return <div className="p-3">{renderContent()}</div>;
};

export default PermissionsSettings;
