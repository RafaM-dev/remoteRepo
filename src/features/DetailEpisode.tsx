import { Dialog, DialogContent, IconButton, Box, Chip } from "@mui/material";
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
          color: "grey.500",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Imagen */}
          <Box
            component="img"
            src={character.image}
            alt={character.name}
            sx={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />

          {/* Información */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <h2 className="text-2xl font-bold">{character.name}</h2>
              <Chip
                label={
                  character.status === "Alive"
                    ? "Vivo"
                    : character.status === "Dead"
                    ? "Muerto"
                    : "Desconocido"
                }
                size="small"
                color={
                  character.status === "Alive"
                    ? "success"
                    : character.status === "Dead"
                    ? "error"
                    : "default"
                }
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <h3 className="text-sm font-semibold text-gray-600">Género</h3>
                <p className="text-base">
                  {character.gender === "Male"
                    ? "Masculino"
                    : character.gender === "Female"
                    ? "Femenino"
                    : character.gender}
                </p>
              </Box>

              <Box>
                <h3 className="text-sm font-semibold text-gray-600">Origen</h3>
                <p className="text-base">{character.origin.name}</p>
              </Box>

              <Box>
                <h3 className="text-sm font-semibold text-gray-600">Especie</h3>
                <p className="text-base">{character.species}</p>
              </Box>

              <Box>
                <h3 className="text-sm font-semibold text-gray-600">
                  Última ubicación conocida
                </h3>
                <p className="text-base">{character.location.name}</p>
              </Box>

              {character.episode && character.episode.length > 0 && (
                <Box>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">
                    Episodios
                  </h3>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {character.episode.slice(0, 5).map((ep) => (
                      <Chip
                        key={ep}
                        label={`E${ep.split("/").pop()}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                    {character.episode.length > 5 && (
                      <Chip
                        label={`+${character.episode.length - 5}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailEpisode;
