import Pagination from "@app/components/ui/Pagination";
import Table from "@app/components/ui/Table";
import { ROUTES } from "@app/constants/routes";
import { navigateTo } from "@app/utils/navigation";
import { Add } from "iconsax-react";
import { useMemo, useState } from "react";
import { Button } from "../../components";
import SectionTitle from "../../components/SectionTitle";
import CustomIcon from "../../components/icons/CustomIcon";
import ProjectRow from "./components/ProjectRow";
import useProjectList from "./hooks/useProjectList";
import type { ProjectListItem } from "./projects.types";

const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useProjectList();

  const handleView = (id: string) => {
    navigateTo(ROUTES.projectDetails.path.replace(":id", id));
  };

  const handleEdit = (id: string) => {
    navigateTo(ROUTES.projectEdit.path.replace(":id", id));
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
    { header: "Project" },
    { header: "Timeline" },
    { header: "Technologies" },
    { header: "Actions", className: "text-right" },
  ];

  return (
    <div className="p-8 max-w-7xl w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <SectionTitle
          title="Project Directory"
          subtitle={`Manage and organize engineering projects across GISCON departments.`}
        />
        <Button
          title="Add Project"
          icon={<CustomIcon IconComponent={Add} />}
          onClick={() => navigateTo(ROUTES.projectNew.path)}
        />
      </div>

      {/* Table */}
      <Table<ProjectListItem>
        columns={columns}
        data={paginatedData}
        isLoading={isLoading}
        emptyMessage="No projects found"
        keyExtractor={(project: ProjectListItem) => project.id}
        renderRow={(project: ProjectListItem) => (
          <ProjectRow
            project={project}
            onView={handleView}
            onEdit={handleEdit}
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

export default ProjectList;
