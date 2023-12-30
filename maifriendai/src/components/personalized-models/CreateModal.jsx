"use client";

import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useState, useCallback } from "react";

const CreateModal = ({ openModal, setOpenModal }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState({ preview: '', data: '' })
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
        
        const img = {
            preview: URL.createObjectURL(selectedFile),
            data: selectedFile,
        };
        setFile(img);
    }
};


  const submitData = useCallback(async () => {
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);
      formData.append('image', file.data, file.data.name); // Use file.data instead of file
  
      const response = await fetch('http://localhost:3000/createFriend', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch data. Status: ${response.status}`);
        const errorData = await response.json();
        console.error('Error data:', errorData);
        return;
      }
  
      const data = await response.json();
      setResponse(data);
  
      if (data.status) {
        setOpenModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [name, role, file, setOpenModal]);
  

  function onCloseModal() {
    setOpenModal(false);
    setName("");
    setRole("");
  }

  function onSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    submitData();
    setName("");
    setRole("");
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-primaryDark dark:text-white">
                Create your Maifriend
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value="Enter a name for your Maifriend"
                  />
                </div>
                <TextInput
                  id="name"
                  placeholder="Eg: Superman"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="role"
                    value="Who do you want your Maifriend to be?"
                  />
                </div>
                <TextInput
                  id="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="Eg: The strongest man on earth"
                  required
                />
                <div className="mb-2 mt-2 block">
                  <Label
                    htmlFor="file"
                    value="Choose an image for your Maifriend?"
                  />
                </div>
                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                ></input>
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-deepBlue hover:bg-lightBlue"
                >
                  {loading ? "Creating Maifriend..." : "Create Maifriend"}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateModal;
