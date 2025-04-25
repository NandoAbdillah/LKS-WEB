import { useAuth } from "../context/AuthContext";

export default function Modal() {
  const { showModal, modalMessage, closeModal, isLoading } = useAuth();

  // Jika showModal false, jangan render apapun (null)
  if (!showModal) return null;

  return (
    <div className="bg-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100">
      <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalMessage.title}</h5>
              <button
                type="button"
                className={`btn-close ${isLoading ? "disabled" : ""}`}
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage.content}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
               className={`btn btn-secondary ${isLoading ? "disabled" : ""}`}
                onClick={closeModal}
              >
                {modalMessage.button[0].label}
              </button>
              <button
                type="button"
                className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
                onClick={() => {
                  modalMessage.button[1].onClick();
                }}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                ) : (
                  ""
                )}
                {isLoading ? "Loading..." : modalMessage.button[1].label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
