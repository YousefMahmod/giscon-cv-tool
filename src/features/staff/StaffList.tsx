import Pagination from "@app/components/ui/Pagination";
import Table from "@app/components/ui/Table";
import { ROUTES } from "@app/constants/routes";
import { Add } from "iconsax-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import SectionTitle from "../../components/SectionTitle";
import CustomIcon from "../../components/icons/CustomIcon";
import StaffRow from "./components/StaffRow";
import useStaffList from "./hooks/useStaffList";
import type { StaffListItem } from "./staff.types";

const StaffList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useStaffList();

  const handleView = (id: string) => {
    navigate(ROUTES.staffDetails.path.replace(":id", id));
  };

  const handleEdit = (id: string) => {
    navigate(ROUTES.staffEdit.path.replace(":id", id));
  };

  const handleGenerateCV = (id: string) => {
    navigate(`${ROUTES.cvGenerator.path}?staffId=${id}`);
  };

  // Client-side pagination
  const paginatedData = useMemo(() => {
    if (!data?.data) return [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    if (!data?.total) return 0;
    return Math.ceil(data.total / pageSize);
  }, [data, pageSize]);

  const columns = [
    { header: "Employee" },
    { header: "Role" },
    { header: "Key Skills" },
    { header: "Actions", className: "text-right" },
  ];

  return (
    <div className="p-8 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <SectionTitle
          title="Staff Directory"
          subtitle={`Manage and organize technical experts across GISCON departments.`}
        />
        <Button
          title="Add Staff"
          icon={<CustomIcon IconComponent={Add} />}
          onClick={() => navigate(ROUTES.staffNew.path)}
          // className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
        />
      </div>

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
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StaffList;
