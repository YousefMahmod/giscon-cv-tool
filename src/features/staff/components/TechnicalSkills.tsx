import { Badge } from "@app/components/ui/Badge";

interface TechnicalSkillsProps {
  skills: string[];
  title?: string;
}

const TechnicalSkills = ({
  skills,
  title = "Technical Skills",
}: TechnicalSkillsProps) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="bg-bg-white border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="primary">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkills;
