import type { StaffProjectItem } from "@app/features/participation/participation.types";
import { SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import CustomIcon from "@app/components/icons/CustomIcon";

interface ProjectSelectorProps {
  projects: StaffProjectItem[];
  selectedProjects: number[];
  onToggle: (projectId: number) => void;
}

const ProjectSelector = ({
  projects,
  selectedProjects,
  onToggle,
}: ProjectSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-sm font-semibold text-text-secondary uppercase mb-2">
          Select Relevant Projects
        </h3>
        <div className="flex justify-between items-center mt-4">
          <div className="relative flex-1 max-w-md mx-auto">
            <CustomIcon
              IconComponent={SearchNormal1}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
              color="icon-secondary"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <span className="text-xs text-text-secondary ml-4">
            {selectedProjects.length} projects selected
          </span>
          {selectedProjects.length > 0 && (
            <button
              onClick={() => selectedProjects.forEach((id) => onToggle(id))}
              className="ml-2 text-xs text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="bg-bg-white border border-border rounded-lg overflow-hidden max-h-100 overflow-y-auto">
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No projects found
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredProjects.map((project) => {
              const isSelected = selectedProjects.includes(project.project_id);
              return (
                <label
                  key={project.project_id}
                  className="flex items-start gap-3 p-4 hover:bg-bg-input/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(project.project_id)}
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      {project.project_name}
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">
                      {project.client}
                    </p>
                    {project.role && (
                      <p className="text-xs text-primary mt-1">
                        Role: {project.role}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelector;
