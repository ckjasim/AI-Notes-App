import NoteNode from '@/components/NoteNode';
import { LogoutUser } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
import {
  fetchNoteApi,
  saveNoteApi,
  updateNoteApi,
  updatePositionApi,
} from '@/services/api/notesApi';
import { showToast } from '@/util/toast/Toast';
import { LogOut } from 'lucide-react';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  Panel,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {
  note: NoteNode,
};

const NoteCanvas: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.Auth);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [noteIdCounter, setNoteIdCounter] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteNote = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    },
    [setNodes]
  );

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const response = await fetchNoteApi(userInfo.id);
        if (response.success) {
          const { allNotes } = response.data;
          if (allNotes && allNotes.length > 0) {
            const reconstructedNodes = allNotes.map((node: Node) => ({
              ...node,
              data: {
                ...node.data,
                updateNote: (title: string, content: string) =>
                  handleNoteUpdate(node.id, title, content),
                onDelete: () => handleDeleteNote(node.id),
              },
            }));
            setNodes(reconstructedNodes);

            const highestId = reconstructedNodes.reduce(
              (max: any, node: any) => {
                const idNum = parseInt(node.id.split('-')[1]);
                return idNum > max ? idNum : max;
              },
              0
            );
            setNoteIdCounter(highestId + 1);
          }
        } else {
          console.error('Failed to fetch notes');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [setNodes, handleDeleteNote, userInfo.id]);

  const handleNoteUpdate = useCallback(
    async (id: string, title: string, content: string) => {
      try {
        await updateNoteApi({ title, content }, id);
      } catch (error) {
        console.error(`Error updating note ${id}:`, error);
      }
    },
    []
  );

  const handleNodeDragStop = useCallback(
    async (_event: React.MouseEvent, node: Node) => {
      try {
        await updatePositionApi(node.position, node.id);
      } catch (error) {
        console.error(`Error updating position for note ${node.id}:`, error);
      }
    },
    []
  );

  const addNewNote = useCallback(async () => {
    try {
      const response = await saveNoteApi({
        node: {
          position: {
            x: 100 + Math.random() * 100,
            y: 100 + Math.random() * 100,
          },
          data: {
            title: 'New Note',
            content: '',
          },
          userId: userInfo.id,
        },
      });
      const { id, position } = response.data.newNote;
      const newNode: Node = {
        id,
        type: 'note',
        position,
        data: {
          title: 'New Note',
          content: '',
          updateNote: (title: string, content: string) =>
            handleNoteUpdate(id, title, content),
          onDelete: () => handleDeleteNote(id),
        },
      };
      setNodes((nds) => [...nds, newNode]);
      setNoteIdCounter((prev) => prev + 1);
    } catch (error) {
      console.error('Error saving new note:', error);
    }
  }, [
    noteIdCounter,
    setNodes,
    handleDeleteNote,
    handleNoteUpdate,
    userInfo.id,
  ]);

  const logout = async () => {
    try {
      dispatch(LogoutUser());
      showToast.success('Logout Successful');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-full h-screen">
      {isLoading ? (
         <div className="flex mt-64 justify-center items-center h-32 gap-2">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
         <p className='text-sm font-semibold '>Loading...</p>
       </div>
      ) : (
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeDragStop={handleNodeDragStop}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background variant={BackgroundVariant.Cross} gap={12} size={1} style={{ backgroundColor: "#f0f0f0" }}/>
          <Panel position="top-right" className="flex gap-3 p-3 rounded-lg">
            <button
              className="px-5 py-2.5 text-white bg-gradient-to-r from-[#6f609e] to-[#7c778a] rounded-xl shadow-md hover:scale-105 transition-all duration-200"
              onClick={addNewNote}
            >
              Add Note
            </button>
            <button
              className="p-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-md hover:scale-105 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </Panel>
        </ReactFlow>
      )}
    </div>
  );
};

export default NoteCanvas;
