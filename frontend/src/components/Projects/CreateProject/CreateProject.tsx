import CreateProjectForm from './CreateProjectForm/CreateProjectForm';

const CreateProject = ({ setShowModal } : { setShowModal: (show: boolean) => void }) => {

    return (
        <section className="container__create__project">
            <h4>Create Project</h4>
            <CreateProjectForm setShowModal={setShowModal} />
        </section>
    )
}

export default CreateProject