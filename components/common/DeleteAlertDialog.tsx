import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";

export interface DeleteAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  headerText: string;
  bodyText: string;
  isLoading: boolean;
}

export const DeleteAlertDialog = (props: DeleteAlertDialogProps) => {
  const { isOpen, onClose, onDelete, headerText, bodyText, isLoading } = props;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{headerText}</AlertDialogTitle>
          <AlertDialogDescription>{bodyText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </AlertDialogCancel>

          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
