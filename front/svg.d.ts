declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: FC<SvgProps & SVGProps<SVGSVGElement>>;
  export default content;
}
