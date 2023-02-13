import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .logout {
    background-color: red;
    margin-left: auto;
    margin-top: 50px;
    width: 100px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  font-weight: bold;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const TableBody = styled.tbody``;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: #fff;
  margin: 8px;
  cursor: pointer;
`;

export const Modal = styled.div<{ isOpen: boolean; onClose: () => void }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  margin-top: 5%;
  z-index: 1;
  width: 30%;
  height: 65%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  color: #000;
  padding: 16px;
  .button {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  background-color: #fff;
  color: #000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .adc {
    float: right;
  }
`;

export const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 90%;
`;

export const Label = styled.label`
  margin-bottom: 8px;
`;

export const Span = styled.span`
  color: red;
  font-size: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
