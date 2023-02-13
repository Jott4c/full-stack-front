import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import jsPDF from "jspdf";

import {
  Container,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  Span,
} from "./styles";

interface Contact {
  name: string;
  phone: string;
  email: string;
  id?: string;
}

const Dashboard: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({} as any);

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleContactGet = async () => {
    const res = await api.get("contacts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token!)}`,
      },
    });
    setContacts(res.data.contact);
  };

  const handleAddContact = async (data: any) => {
    try {
      const res = await api.post("contacts", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token!)}`,
        },
      });
      if (res.status === 201) {
        setContacts([...contacts, res.data]);
        handleCloseModal();
        reset();
        setError({});
      }
    } catch (error: any) {
      if (error.response.data.message === "This email has already been used") {
        setError({
          email: "Este email já existe",
        });
      }
      if (error.response.data.message === "This phone has already been used") {
        setError({
          phone: "Este Telefone já existe",
        });
      }
      console.log(error);
    }
  };

  const handleRemoveContact = async (id: string) => {
    await api.delete(`contacts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token!)}`,
      },
    });

    handleContactGet();
  };
  const handleExportContacts = () => {
    const doc = new jsPDF();
    doc.text("Name", 10, 20);
    doc.text("Telefone", 50, 20);
    doc.text("Email", 100, 20);

    contacts.forEach((contact, index) => {
      doc.text(contact.name, 10, 30 + index * 10);
      doc.text(contact.phone, 50, 30 + index * 10);
      doc.text(contact.email, 100, 30 + index * 10);

      if (index !== contacts.length - 1) {
        doc.line(10, 35 + index * 10 - 2.5, 190, 35 + index * 10 - 2.5);
      }
    });

    doc.save("contacts.pdf");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    handleContactGet();
  }, [token]);

  return (
    <Container>
      <Button onClick={handleOpenModal}>Add Contato</Button>
      <Button onClick={handleExportContacts}>Export Contatos</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Apagar</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={contact.email}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleRemoveContact(contact.id!)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalHeader>
          Adicionar contato{" "}
          <IoIosCloseCircleOutline
            className="button"
            onClick={handleCloseModal}
          />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(handleAddContact)}>
            <Label htmlFor="name">Name:</Label>
            <Input id="name" type="text" {...register("name")} />

            <Label htmlFor="phone">Telefone:</Label>
            <Span>{error.phone}</Span>
            <Input id="phone" type="text" {...register("phone")} />
            <Label htmlFor="email">Email:</Label>
            <Span>{error.email}</Span>
            <Input id="email" type="email" {...register("email")} />
            <Button type="submit" className="adc">
              Add Contact
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Button className="logout" onClick={() => logout()}>
        Sair
      </Button>
    </Container>
  );
};

export default Dashboard;
