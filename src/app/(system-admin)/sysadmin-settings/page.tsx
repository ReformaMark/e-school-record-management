import { SchoolSettingsForm } from "./_components/school-settings-form";

const SystemSettingsPage = () => {
    return (
        <div className="container py-10">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-3xl font-bold">School Settings</h1>
                <SchoolSettingsForm />
            </div>
        </div>
    )
}

export default SystemSettingsPage;