import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Character } from "../shared/types";

interface DetailEpisodeProps {
  character: Character | null;
  open: boolean;
  onClose: () => void;
}

const DetailEpisode = ({ character, open, onClose }: DetailEpisodeProps) => {
  if (!character) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: "600px",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "white",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Banner superior */}
          <Box
            sx={{
              width: "100%",
              height: "128px",
              backgroundImage: "url('banner.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Sección de avatar y nombre */}
          <Box sx={{ px: 3, mt: -4, position: "relative" , bgcolor: '#E6E7E3' }}>
            <Box
              sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 3 }}
            >
              <Avatar
                src={character.image}
                alt={character.name}
                sx={{
                  width: 100,
                  height: 100,
                  border: "4px solid white",
                }}
              />
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <h2 className="text-2xl font-bold">{character.name}</h2>
                  <span>⭐</span>
                </Box>
                <p className="text-sm text-gray-600">{character.species}</p>
              </Box>
            </Box>

            <Box sx={{  mb: 3 }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    bgcolor: '#fafafa',
                    padding: '16px',
                    borderRadius: '8px',
                  }}
                >
                  <span>Información</span>
                  <div>
                    <span>Género</span>
                    <span>Masculino</span>
                  </div>
                  <div>
                    <span>Género</span>
                    <span>Masculino</span>
                  </div>
                  <div>
                    <span>Género</span>
                    <span>Masculino</span>
                  </div>
                </Box>
                <Box
                   sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    bgcolor: '#fafafa',
                    padding: '16px',
                    borderRadius: '8px',
                  }}
                >
                  <div>Episodios</div>
                  <div>
                    <span>S01 E06</span>
                    <span>Piloto</span>
                  </div>
                  <div>
                    <span>S01 E06</span>
                    <span>Rick potion</span>
                  </div>
                  <div>
                    <span>S01 E04</span>
                    <span>M. Night Shaym-Aliens</span>
                  </div>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                pb: 3,
              }}
            >
              <Box>
                <h3 className="text-xs font-semibold text-gray-500 mb-1">
                  Última ubicación conocida
                </h3>
                <p className="text-base">{character.location.name}</p>
              </Box>
            </Box>

          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailEpisode;
