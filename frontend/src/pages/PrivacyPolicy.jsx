import { Link } from "react-router-dom";
import ppImage from "C:\\Users\\yasmine\\Desktop\\elSentDemo1\\frontend\\src\\assets\\ppImg.jpg"; 
const PrivacyPolicy = () => {
  return (
    <>
      <div className="text-white">
      <div
          className="flex items-center justify-center flex-col h-[280px] bg-cover"
          style={{ backgroundImage: `url(${ppImage})` }}
        >
          <h1 className="text-center font-bold text-3xl">Privacy Policy</h1>
          <div className="flex gap-2 font-medium pt-2">
            <Link
              to="/"
              className="no-underline hover:text-theme-color transition-all"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-theme-color">Privacy Policy</span>
          </div>
        </div>

        <div className="px-4 py-20 flex flex-col m-auto gap-10 max-w-[1300px]">
          {/* Article 1 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Article 1 - Introduction and Definitions:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>
                <span className="font-semibold">Definitions:</span> The preamble
                above is an integral part of this agreement. Below are the key
                terms used in this agreement:
                <ul className="list-disc pl-6">
                  <li>
                    <strong>Store:</strong> This definition includes all forms
                    of online stores, whether they are mobile applications,
                    websites on the internet, or commercial auctions.
                  </li>
                  <li>
                    <strong>Consumer:</strong> The individual who engages in
                    e-commerce with the aim of obtaining products or services
                    offered by the store through its online platform.
                  </li>
                  <li>
                    <strong>Agreement:</strong> Refers to the terms and
                    conditions of this agreement, which govern the relationship
                    between the parties involved in it.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Article 2 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Article 2 - Consumer's Legal Eligibility:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>
                <span className="font-semibold">
                  The consumer declares that they have full legal capacity,
                  both religiously and legally, to interact with the store, or
                  that they are at least 18 years of age.
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  The consumer agrees that if they violate this article, they
                  will bear the consequences of this violation in relation to
                  third parties.
                </span>
              </li>
            </ul>
          </div>

          {/* Article 3 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Article 3 - Nature of Obligation:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>The store's obligation towards consumers is to provide (the service or product).</li>
              <li>The store may provide other services such as post-sale services, resizing, repair, and customization of items, or other related services. Additional fees may apply, depending on the nature of the service or work requested by the consumer.</li>
            </ul>
          </div>

          {/* Article 4 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 5 - Accounts and Registration Obligations:
            </h2>
            <p className="text-body-text-color pt-5">
            When you apply to join the store as a user, you must disclose certain information and choose a username and a confidential password to access store services. By doing so, you agree to the following
            </p>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>You are responsible for maintaining the confidentiality of your account information and password and agree to notify the store immediately of any unauthorized use of your account or any breach of your confidential information.</li>
              <li>The store will not be responsible, under any circumstances, for any direct or indirect, moral or material loss resulting from the disclosure of your username or login details.</li>
              <li>You are fully responsible for using your account or membership on the store. If others use your account, it will be presumed that you have authorized them to do so.</li>
              <li>You agree to use the store with seriousness and honesty.</li>
              <li>You agree to disclose accurate, up-to-date, complete, and lawful information about yourself as required when registering for the store. You also agree to update your data whenever necessary.</li>
              <li>The store is committed to maintaining the confidentiality of your personal information and contact details.</li>
              <li>If it is discovered that you provided false, inaccurate, outdated, or incomplete information, the store has the right to suspend, freeze, or cancel your membership without causing harm to the store's rights or its legal methods for recovering damages and protecting other consumers.</li>
              <li>If you fail to comply with any of the above, the store has the right to suspend or cancel your membership or restrict your access to its services.
              .</li>
            
            </ul>
          </div>

          {/* Article 5 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 6 - Electronic Communications and Official Means of Contact:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>The parties to this agreement agree that communication will be done via the email registered on the platform.</li>
              <li>The consumer agrees that all agreements, notices, statements, and other communications that are electronically sent to them will be treated the same as written communications.</li>
              <li>The consumer agrees that the store may notify them of any updates to this agreement or any interactions by broadcasting general messages to all consumers or specific users.
              </li>
            </ul>
          </div>

          {/* Article 6 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 7 - Amendments to the Terms of Use and Fees:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>If any provision or clause of this agreement is found to be invalid or unenforceable, it does not affect the validity of the remaining provisions.</li>
              <li>This agreement, which is subject to periodic amendment, establishes the work mechanism and understanding between the (consumer) and the (store).</li>
              <li>The store may charge fees for certain consumers, depending on the services or products they request or on taxes or charges imposed by the state.</li>
              <li>The store reserves the right to add, increase, decrease, or waive any fees or expenses under this agreement.
              </li>
            
            </ul>
          </div>

          {/* Article 7 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 8 – Payment and Settlement Services for Store Services:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>The store provides payment and settlement services through its partners. Payments can be made online through available payment options on the store, or through any payment method the store offers from time to time.</li>
              <li>The store is committed to determining the price of the service or product it displays in accordance with market prices.</li>
              </ul>
          </div>

          {/* Article 8 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 9 – Intellectual Property Rights:
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>The intellectual property rights of the auction belong fully to Al-Sint International Company, regardless of whether these rights existed before or after the establishment of this electronic platform.</li>
              <li>Consumers must respect the intellectual property rights of the store, which include the name, logos, symbols, and any other intellectual property displayed on the store.
              </li>
              </ul>
          </div>

          {/* Article 9 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 10 - Store's Responsibility
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>The store is committed to conducting its business through this electronic platform in accordance with applicable regulations in the Kingdom of Saudi Arabia and in line with this agreement. </li>
              <li>The store is not responsible for any claims resulting from errors or negligence by the consumer or third parties, such as shipping companies.
              </li>
              <li>The store and its employees are committed to ensuring that all products or services are lawful, authorized, and in compliance with the laws and regulations of the Kingdom of Saudi Arabia.
              </li>
              </ul>
          </div>

          {/* Article 10 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 11 - Restricting Access or Membership:
            </h2>
            <p className="text-body-text-color pt-5">
            The store may suspend, cancel, or restrict access to a consumer's account at any time, without warning or reason.
            </p>
          </div>

          {/* Article 11 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 12 - Governing Law and Applicable Regulations:
            </h2>
            <p className="text-body-text-color pt-5">
            This usage agreement is governed by the laws, regulations, and legislation applicable in the Kingdom of Saudi Arabia. It is subject to the laws in force at the relevant authorities in the Kingdom of Saudi Arabia.
            </p>
          </div>
          {/* Article 13 */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
            Article 13 - General Provisions::
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>If any provision of this agreement is found to be invalid or unenforceable, it will not affect the validity of the remaining provisions. </li>
              <li>This agreement, subject to periodic amendments, governs the understanding, mechanism, and arrangement between the consumer and the store.
              </li>
              <li>The Arabic language is the primary language for interpreting this agreement.
              </li>
              <li>The store reserves the right to change the prices of products and services from time to time.
              </li>
              <li>Promotional or marketing offers are temporary and subject to change, modification, or cancellation at any time.
              </li>
              <li>All interactions between the store and the consumer must comply with relevant legal and religious rules.
              </li>
              <li>This usage agreement cannot be terminated except through a decision issued by the store's management.
              </li>
              </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
