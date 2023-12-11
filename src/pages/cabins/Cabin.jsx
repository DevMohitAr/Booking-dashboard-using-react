import React from "react";
import { deleteCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Form from "../../ui/Form";
import { useDeleleCabin } from "../../hooks/cabins/useDeleteCabin";
import { useCreateCabin } from "../../hooks/cabins/useCreateCabin";
import Modal from "../../components/Modal-v1";
import ConfirmDelete from "../../components/ConfirmDelete";
import Menu from "../../components/MenuComp";

export default function Cabin({ cabin }) {
  const [showEdit, setShowEdit] = React.useState(false);
  const {
    id: cabinId,
    name,
    description,
    discount,
    regularPrice,
    maxCapacity,
    image,
  } = cabin;
  const { isLoading: isDeleting, mutate: deleteCabin } = useDeleleCabin();
  const { mutate: createCabin, isLoading: isCreating } = useCreateCabin();

  const handleDuplicate = () => {
    createCabin({
      name: `copy of ${name}`,
      description,
      regularPrice,
      discount,
      maxCapacity,
      image,
    });
  };
  return (
    <>
      <article
        key={cabin.id}
        className="grid grid-cols-[.6fr_1.8fr_2.2fr_1fr_1fr_1fr_1fr] items-center shadow-md gap-5 mb-4 p-4 capitalize  text-lg"
      >
        <div>{cabin.name}</div>
        <div>{cabin.maxCapacity}</div>
        <div>{cabin.regularPrice}</div>
        <div>{cabin.discount}</div>
        {/* <p className="w-[38ch]">{cabin.description}</p> */}

        <div>
          <img src={cabin.image} className="w-full block object-cover h-full" />
        </div>

        <div className="flex gap-3 text-2xl justify-center ">
          {" "}
          <Modal>
            <Menu>
              <Menu.Toggle id={cabinId} />
              <Menu.List id={cabinId}>
                <Menu.Button
                  icon={<HiOutlineDuplicate />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menu.Button>
                <Modal.open opens="edit-form">
                  <Menu.Button icon={<MdOutlineModeEditOutline />}>
                    Edit
                  </Menu.Button>
                </Modal.open>
                <Modal.open opens="delete">
                  <Menu.Button icon={<AiFillDelete />}>Delete</Menu.Button>
                </Modal.open>
              </Menu.List>

              <Modal.window compName="edit-form">
                <Form cabin={cabin} />
              </Modal.window>

              <Modal.window compName="delete">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.window>
            </Menu>
          </Modal>
        </div>
      </article>
    </>
  );
}
