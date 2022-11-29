import React from 'react';

const ConfirmModal = ({ title, message, closeModal, modalData, successAction, successBtnName }) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className='modal-action'>
                        <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn bg-red-500">{successBtnName}</label>
                        <button onClick={closeModal} className='btn btn-outline'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;