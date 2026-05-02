//# 1
export interface TemplateConfig {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  componentKey: "classic" | "minimalist" | "government" | "executive";
}

export const CV_TEMPLATES: TemplateConfig[] = [
  {
    id: "1",
    title: "Classic Tech CV",
    subtitle: "Comprehensive summary with projects and experience.",
    img: "/assets/templates/classic.png",
    componentKey: "classic",
  },
  {
    id: "2",
    title: "Minimalist Design",
    subtitle: "Create a professional design and minimalist design.",
    img: "/assets/templates/minimalist.png",
    componentKey: "minimalist",
  },
  // Add more as needed...
];
//#2 The "Component Registry"

// import ClassicTemplate from './ClassicTemplate';
// import MinimalistTemplate from './MinimalistTemplate';
// // ... import others

// // This object maps your string keys to actual React Components
// export const TemplateRegistry: Record<string, React.FC<any>> = {
//   classic: ClassicTemplate,
//   minimalist: MinimalistTemplate,
//   // government: GovernmentTemplate,
//   // executive: ExecutiveTemplate,
// };

// #3 Rendering the Selected Template
// import { TemplateRegistry } from './TemplateRegistry';
// import { CV_TEMPLATES } from '../constants/templates';

// const TemplateRenderer = ({ selectedId, data }) => {
//   // 1. Find the metadata by ID
//   const templateInfo = CV_TEMPLATES.find(t => t.id === selectedId);

//   if (!templateInfo) return <div>Template not found</div>;

//   // 2. Get the actual Component from the Registry
//   const SelectedComponent = TemplateRegistry[templateInfo.componentKey];

//   // 3. Render it with the staff/project data
//   return <SelectedComponent data={data} />;
// };

// # Example for using

// src/components/templates/ClassicTemplate.tsx
// import { FinalCVData } from '../../types/cv';

// const ClassicTemplate: React.FC<{ data: FinalCVData }> = ({ data }) => {
//   return (
//     <div className="p-8 bg-white text-gray-900 font-serif">
//       <header className="border-b-2 border-blue-800 pb-4 mb-6">
//         <h1 className="text-4xl font-bold uppercase">{data.staffName}</h1>
//         <p className="text-xl text-blue-800">{data.jobTitle}</p>
//       </header>

//       <section className="mb-8">
//         <h2 className="text-lg font-bold border-b mb-2">Technical Projects</h2>
//         {data.selectedProjects.map((proj) => (
//           <div key={proj.id} className="mb-6">
//             <div className="flex justify-between font-bold">
//               <span>{proj.name} — {proj.role}</span>
//               <span>{proj.startDate} - {proj.endDate || 'Present'}</span>
//             </div>
//             <ul className="list-disc ml-5 mt-2">
//               {proj.responsibilities.map((res, i) => (
//                 <li key={i}>{res}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };
