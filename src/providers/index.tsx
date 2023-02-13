import { UserProvider } from "./UserContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
