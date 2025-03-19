import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectMonth({
  setSelectedMonth,
}: {
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleValueChange(value: number) {
    setSelectedMonth(value);
  }
  return (
    <Select
      onValueChange={(value) => {
        handleValueChange(Number(value));
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          <SelectItem value="0">January</SelectItem>
          <SelectItem value="1">February</SelectItem>
          <SelectItem value="2">March</SelectItem>
          <SelectItem value="3">April</SelectItem>
          <SelectItem value="4">May</SelectItem>
          <SelectItem value="5">June</SelectItem>
          <SelectItem value="6">July</SelectItem>
          <SelectItem value="7">August</SelectItem>
          <SelectItem value="8">September</SelectItem>
          <SelectItem value="9">October</SelectItem>
          <SelectItem value="10">November</SelectItem>
          <SelectItem value="11">December</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
