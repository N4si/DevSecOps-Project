import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Movie } from "src/types/Movie";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import AgeLimitChip from "./AgeLimitChip";
import { useGetConfigurationQuery } from "src/store/slices/configuration";

interface SimilarVideoCardProps {
  video: Movie;
}

export default function SimilarVideoCard({ video }: SimilarVideoCardProps) {
  const { data: configuration } = useGetConfigurationQuery(undefined);

  return (
    <Card>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <Box
          component="img"
          src={`${configuration?.images.base_url}w780${video.backdrop_path}`}
          sx={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            backgroundPosition: "50%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 15,
          }}
        >
          <Typography variant="subtitle2">{`${formatMinuteToReadable(
            getRandomNumber(180)
          )}`}</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            px: 2,
            pb: 0.5,
          }}
        >
          <MaxLineTypography
            maxLine={1}
            sx={{ width: "80%", fontWeight: 700 }}
            variant="subtitle1"
          >
            {video.title}
          </MaxLineTypography>
        </Box>
      </Box>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center">
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "success.main" }}
              >{`${getRandomNumber(100)}% Match`}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                <Typography variant="body2">
                  {video.release_date.substring(0, 4)}
                </Typography>
              </Stack>
            </Box>
            <Box flexGrow={1} />
            <NetflixIconButton size="large">
              <AddIcon />
            </NetflixIconButton>
          </Stack>
          <Box>
            <MaxLineTypography maxLine={4} variant="subtitle2">
              {video.overview}
            </MaxLineTypography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
