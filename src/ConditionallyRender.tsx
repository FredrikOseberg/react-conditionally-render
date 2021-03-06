import { IConditionallyRenderProps, RenderFunc } from './types';

const ConditionallyRender = ({
  condition,
  show,
  elseShow,
}: IConditionallyRenderProps): JSX.Element | null => {
  const isFunc = (param: JSX.Element | RenderFunc) => {
    return typeof param === 'function';
  };

  const handleFunction = (renderFunc: RenderFunc): JSX.Element | null => {
    const result = renderFunc();
    if (!result) {
      console.warn(
        'Nothing was returned from your render function. Please make sure you are returning a valid React element.'
      );
      return null;
    }
    return result;
  };

  if (condition) {
    if (isFunc(show)) {
      return handleFunction(show as RenderFunc);
    }
    return show as JSX.Element;
  }

  if (!condition && elseShow) {
    if (isFunc(elseShow)) {
      return handleFunction(elseShow as RenderFunc);
    }
    return elseShow as JSX.Element;
  }
};

export default ConditionallyRender;
