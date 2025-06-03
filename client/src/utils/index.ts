const GENRE_OPTIONS = [
  { value: '', label: 'All Genres' },
  { value: 'Action', label: 'Action' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Comedy', label: 'Comedy' },
];

const LANGUAGE_OPTIONS = [
  { value: '', label: 'All Languages' },
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Spanish', label: 'Spanish' },
];

const QUALITY_OPTIONS = [
  { value: '', label: 'Quality' },
  { value: '480p', label: '480p' },
  { value: '720p', label: '720p' },
  { value: '1080p', label: '1080p' },
];

const SORT_BUTTONS = [
  { key: 'title', label: 'Title', color: 'blue' },
  { key: 'year', label: 'Year', color: 'green' },
];

export {
    GENRE_OPTIONS,
    LANGUAGE_OPTIONS,
    QUALITY_OPTIONS,
    SORT_BUTTONS,
}