// ================================================
// COMPONENTE: DIÁLOGO DE CONFIRMAÇÃO DE EXCLUSÃO
// ================================================

import React from 'react';
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';

export default function ConfirmDialog({ visivel, mensagem, onConfirmar, onCancelar }) {
    return (
        <Portal>
            <Dialog visible={visivel} onDismiss={onCancelar}>
                <Dialog.Title>Confirmar</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{mensagem}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancelar}>Cancelar</Button>
                    <Button onPress={onConfirmar} textColor="red">
                        Excluir
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
