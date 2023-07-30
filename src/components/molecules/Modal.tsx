import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

/**
 * A reusable confirmation modal component that displays a modal dialog with a confirmation message and two buttons (Confirm and Cancel).
 * @param {ConfirmationModalProps} props - The properties to configure the confirmation modal.
 * @returns {JSX.Element} The ConfirmationModal component displaying the modal dialog.
 */

type VariantType = 'primary' | 'danger'
interface ConfirmationModalProps {
  title: string
  message: string
  confirmBtnText: string
  isModalVisible: boolean
  variant: VariantType,
  onConfirm: () => void
  onCancel: () => void
}

export default ({ isModalVisible, title, message, confirmBtnText, variant = 'primary', onConfirm, onCancel }: ConfirmationModalProps) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(isModalVisible)
  }, [isModalVisible])

  const handleConfirm = () => {
    onConfirm()
    setShowModal(false)
  }

  const handleCancel = () => {
    onCancel()
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={() => handleCancel()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
