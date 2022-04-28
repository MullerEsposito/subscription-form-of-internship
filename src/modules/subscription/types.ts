export type ISubscription = {
  id: number;
  candidateName: string;
  collegeName: string;
  address: string;
  email: string;
  cpf: string;
  pcd: string;
  phone: string;
  period: string;
  birthdate: string;
  status: "accepted" | "rejected" | "pending";
  accesskey: string;
  course: "right" | "administration" | "contability";
  color: "white" | "black" | "brown" | "yellow" | "indian";
  privacyTerm: boolean;
  documents: {
    photo?: FileList;
    identity?: FileList;
    collegeRegistrationDeclaration?: FileList;
    schoolRecords?: FileList;
    voluntaryServiceDeclaration?: FileList;
  }; 
}

