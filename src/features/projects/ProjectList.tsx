import Pagination from "@app/components/ui/Pagination";
import Table from "@app/components/ui/Table";
import { ROUTES } from "@app/constants/routes";
import { navigateTo } from "@app/utils/navigation";
import { Add } from "iconsax-react";
import { useMemo, useState } from "react";
import { Button, PageHeader } from "../../components";
import CustomIcon from "../../components/icons/CustomIcon";
import ProjectRow from "./components/ProjectRow";
import useDeleteProject from "./hooks/useDeleteProject";
import useProjectList from "./hooks/useProjectList";
import type { ProjectListItem } from "./projects.types";

const PAGE_SIZE = 6;

const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, dataUpdatedAt, isLoading } = useProjectList();

  const handleView = (id: string) => {
    navigateTo(ROUTES.projectDetails.path.replace(":id", id));
  };

  const handleEdit = (id: string) => {
    navigateTo(ROUTES.projectEdit.path.replace(":id", id));
  };

  const deleteMutation = useDeleteProject();

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    deleteMutation.mutate(id);
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
    { header: "Project" },
    { header: "Timeline" },
    { header: "Technologies" },
    { header: "Actions", className: "text-right" },
  ];

  return (
    <>
      <PageHeader
        title="Project Directory"
        subtitle={`Manage and organize engineering projects across GISCON departments.`}
        actions={
          <>
            <Button
              title="Add Project"
              icon={<CustomIcon IconComponent={Add} />}
              onClick={() => navigateTo(ROUTES.projectNew.path)}
              className="hidden md:inline-flex"
            />
            <CustomIcon
              IconComponent={Add}
              className="md:hidden"
              color="icon-primary"
              onClick={() => navigateTo(ROUTES.projectNew.path)}
              size={28}
            />
          </>
        }
        hideBackButton
      />

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
            onDelete={handleDelete}
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

export default ProjectList;
