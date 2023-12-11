import Modal from "../../components/Modal-v1";
import Form from "../../ui/Form";
export default function CabinAdd() {
  return (
    <>
      <Modal>
        <Modal.open opens="cabin-form">
          <div className="text-center m-auto mt-10 text-gray-50 w-28  ">
            {" "}
            <button className="p-2   bg-gray-700 ">Create a cabin</button>
          </div>
        </Modal.open>
        <Modal.window compName="cabin-form">
          <Form />
        </Modal.window>
      </Modal>
    </>
  );
}
