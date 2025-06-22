import React, { useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const TablaDeudasEditable = ({ data: initialData }) => {
  // Estado para manejar los datos de la tabla
  const [data, setData] = useState(initialData);

  // Definición de las columnas
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 150,
        // Hacemos la columna editable
        muiTableBodyCellEditTextFieldProps: {
          type: 'text',
          required: true,
          onChange: (event) => validateInput(event, 'nombre', /^[a-zA-Z\s]+$/),
        },
      },
      {
        accessorKey: 'monto',
        header: 'Monto',
        size: 100,
        // Configuración para columna numérica editable
        muiTableBodyCellEditTextFieldProps: {
          type: 'number',
          required: true,
          onChange: (event) => validateNumberInput(event, 'monto'),
        },
      },
      {
        accessorKey: 'cantidad_cuotas',
        header: 'Cuotas Totales',
        size: 100,
        muiTableBodyCellEditTextFieldProps: {
          type: 'number',
          required: true,
          min: 1,
          onChange: (event) => validateNumberInput(event, 'cantidad_cuotas'),
        },
      },
      {
        accessorKey: 'cuotas_pagadas',
        header: 'Cuotas Pagadas',
        size: 100,
        muiTableBodyCellEditTextFieldProps: {
          type: 'number',
          required: true,
          min: 0,
          onChange: (event) => validateNumberInput(event, 'cuotas_pagadas'),
        },
      },
      {
        accessorKey: 'total_deuda',
        header: 'Total Deuda',
        size: 100,
        // Podemos hacer que esta columna sea calculada automáticamente
        Cell: ({ row }) => (
          <span>
            {row.original.monto - 
             (row.original.monto / row.original.cantidad_cuotas) * row.original.cuotas_pagadas}
          </span>
        ),
      },
    ],
    []
  );

  // Función para validar números
  const validateNumberInput = (event, field) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      // Actualizar el estado con el nuevo valor
      const rowIndex = event.target.closest('tr').rowIndex - 1;
      const updatedData = [...data];
      updatedData[rowIndex][field] = value;
      setData(updatedData);
    }
  };

  // Función para validar texto
  const validateInput = (event, field, regex) => {
    if (regex.test(event.target.value)) {
      const rowIndex = event.target.closest('tr').rowIndex - 1;
      const updatedData = [...data];
      updatedData[rowIndex][field] = event.target.value;
      setData(updatedData);
    }
  };

  // Configuración de la tabla
  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    editDisplayMode: 'cell',
    positionActionsColumn: 'last',
    muiTableContainerProps: {
      sx: {
        maxHeight: '500px',
      },
    },
    muiTablePaperProps: {
      sx: {
        padding: '16px',
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default TablaDeudasEditable;