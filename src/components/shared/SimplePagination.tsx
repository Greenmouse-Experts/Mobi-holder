import { useState } from "react";
import { MantineProvider, Pagination } from "@mantine/core";

interface Props {
  total?: number;
  page?: number;
  onChange?: (page: number) => void;
}

export default function SimplePagination(props: Props) {
  return (
    <MantineProvider>
      <div>
        <Pagination
          value={props.page || 1}
          onChange={props.onChange}
          total={props?.total || 0}
        />
      </div>
    </MantineProvider>
  );
}
