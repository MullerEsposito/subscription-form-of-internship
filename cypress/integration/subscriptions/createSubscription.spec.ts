
describe("Create Subscription", () => {
  it("should be created a new subscription", () => {
    const inscriptionId = "1";
    const inscriptionAccesskey = "@cc3ssk3Y";
    const img = "profile.jpg";
    const document = "document.pdf";
    // cy.intercept({ 
    //   method: "POST", 
    //   url: "/subscriptions"
    // },{
    //   id: inscriptionId,
    //   accesskey: inscriptionAccesskey,
    // }).as("createSubscription");

    cy.visit("http://localhost:3000/subscription");

    cy.get("[id='form.photo']").attachFile(img);
    cy.get("[id='form.name']").type("Müller Esposito Nunes");
    cy.get("[id='form.college']").type("UNIFRAN");
    cy.get("[id='form.address']").type("Rua Joaquim Rodrigues 286, Casa 12. Santa Laura.");
    cy.get("[id='form.cpf']").type("67164110387");
    cy.get("[id='form.email']").type("mulleresposito@hotmail.com");
    cy.get("[id='form.phone']").type("38984171472");
    cy.get("[id='form.birthdate']").type("1989-02-10");
    cy.get("[id='form.course']").select("admnistration");
    cy.get("[id='form.color']").select("white");
    cy.get("[type='radio']").check("5", { force: true });
    cy.get("[type='radio']").check("nao", { force: true });
    cy.get("[id='form.identity']").attachFile(document);
    cy.get("[id='form.declaration']").attachFile(document);
    cy.get("[id='form.records']").attachFile(document);
    cy.get("[name='privacyTerm']").check({ force: true });

    cy.get("[type=submit]").click();

    cy.get("[data-testid='inscription.id']").should("contain.text", inscriptionId);
    cy.get("[data-testid='inscription.accesskey']").should("contain.text", inscriptionAccesskey);
  })  
})