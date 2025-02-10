"use client"
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { SectionForm } from "../../_components/section-form";

const EditSectionPage = () => {
    const params = useParams();
    const sectionId = params.sectionId as string;

    const section = useQuery(api.sections.getSections)?.find(
        s => s._id === sectionId
    );

    if (!section) return <div>Loading...</div>;

    return <SectionForm isEditing={true} section={section} />;
};

export default EditSectionPage;