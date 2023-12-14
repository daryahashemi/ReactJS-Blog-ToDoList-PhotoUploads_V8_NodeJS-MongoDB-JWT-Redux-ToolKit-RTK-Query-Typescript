import { createContext, useState, ReactElement } from 'react'

export interface AlbumContext {
  openDelete: Boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<Boolean>>;
  photoSelectedDelete: string[];
  setPhotoSelectedDelete: React.Dispatch<React.SetStateAction<string[]>>;
}

export type AlbumContextState = AlbumContext | {}

export const DataContext = createContext<AlbumContextState>({});

export type ChildrenType = {children?: ReactElement | ReactElement[] | undefined }

export const DataContextProvider = ({ children }: ChildrenType): ReactElement => {

    const [openDelete, setOpenDelete] = useState<Boolean>(false)
    const [photoSelectedDelete, setPhotoSelectedDelete] = useState<string[]>([])

  return (
    <DataContext.Provider value={{ 
        openDelete, setOpenDelete,
        photoSelectedDelete, setPhotoSelectedDelete
      }}>
      { children }
    </DataContext.Provider>
  )
}

