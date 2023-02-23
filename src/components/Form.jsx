import React from "react";
import { FormProvider } from "react-hook-form";

export default React.forwardRef(function Form(
  { methods, onSubmit, children, id = undefined, ...props },
  ref
) {
  const { handleSubmit } = methods;

  const onSubmitForm = async (event) => {
    if (event) {
      if (typeof event.preventDefault === "function") event.preventDefault();
      if (typeof event.stopPropagation === "function") event.stopPropagation();
    }

    return handleSubmit(async (values) => onSubmit(values))(event);
  };

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        ref={ref}
        onSubmit={onSubmitForm}
        autoComplete="off"
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
});
