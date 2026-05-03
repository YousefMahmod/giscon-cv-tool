import Pagination from "@app/components/ui/Pagination";
import Table from "@app/components/ui/Table";
import { ROUTES } from "@app/constants/routes";
import { navigateTo } from "@app/utils/navigation";
import { Add } from "iconsax-react";
import { useMemo, useState } from "react";
import { Button, PageHeader } from "../../components";
import CustomIcon from "../../components/icons/CustomIcon";
import StaffRow from "./components/StaffRow";
import useStaffList from "./hooks/useStaffList";
import type { StaffListItem } from "./staff.types";

const PAGE_SIZE = 6;

const StaffList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, dataUpdatedAt, isLoading } = useStaffList();

  const handleView = (id: string) => {
    navigateTo(ROUTES.staffDetails.path.replace(":id", id));
  };

  const handleEdit = (id: string) => {
    navigateTo(ROUTES.staffEdit.path.replace(":id", id));
  };

  const handleGenerateCV = (id: string) => {
    navigateTo(`${ROUTES.cvGenerator.path}?staffId=${id}`);
  };

  // Client-side pagination
  const paginatedData = useMemo(() => {
    if (!data?.data) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.data.slice(startIndex, endIndex);
  }, [dataUpdatedAt, currentPage]);

  const totalPages = useMemo(() => {
    if (!data?.total) return 0;
    return Math.ceil(data.total / PAGE_SIZE);
  }, [dataUpdatedAt]);

  const columns = [
    { header: "Employee" },
    { header: "Role" },
    { header: "Key Skills" },
    { header: "Actions", className: "text-right" },
  ];

  return (
    <>
      <PageHeader
        title="Staff Directory"
        subtitle="Manage and organize technical experts across GISCON departments."
        actions={
          <>
            <Button
              title="Add Staff"
              icon={<CustomIcon IconComponent={Add} />}
              onClick={() => navigateTo(ROUTES.staffNew.path)}
              className="hidden md:inline-flex"
            />
            <CustomIcon
              IconComponent={Add}
              className="md:hidden"
              color="icon-primary"
              size={28}
            />
          </>
        }
        hideBackButton
      />

      {/* Table */}
      <Table<StaffListItem>
        columns={columns}
        data={paginatedData}
        isLoading={isLoading}
        emptyMessage="No staff members found"
        keyExtractor={(staff: StaffListItem) => staff.id}
        renderRow={(staff: StaffListItem) => (
          <StaffRow
            staff={staff}
            onView={handleView}
            onEdit={handleEdit}
            onGenerateCV={handleGenerateCV}
          />
        )}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={data?.total || 0}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default StaffList;
