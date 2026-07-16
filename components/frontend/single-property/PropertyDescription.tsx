import { Project } from "@/types/property";

interface Props {
  data: Project;
}
const PropertyDescription = ({ data }: Props) => {
  return (
    <>
      <div>
        <p className="text mb10">{data.description}</p>
      </div>
    </>
  );
};

export default PropertyDescription;
