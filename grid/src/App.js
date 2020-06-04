import React, { useEffect } from "react";
import sampleData from "./sample_data.json";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import FlightEdit from "./FlightEdit";
import SegmentEdit from "./SegmentEdit";
import DetailsEdit from './DetailsEdit';
import WeightEdit from './WeigthEdit'
import VolumeEdit from './VolumeEdit';
import RevenueEdit from './RevenueEdit';
import QueuedBookingEdit from './QueuedBookingEdit';
import UldPositionsEdit from './UldPositionsEdit';
import "./styles.css";
import Header from "./Header/Header";

const { SearchBar } = Search;
const $ = window.$;

const flightFormatter = (cell) => {
	return (
		<div>
			<p style={{ color: "red" }}>{cell.flightno}</p>
			<br />
			<p>{cell.date}</p>
		</div>
	);
};

const segmentFormatter = (cell) => {
	return (
		<div>
			<p>
				{cell.from} - {cell.to}
			</p>
		</div>
	);
};

const detailsFormatter = (cell) => {
	return (
		<div>
			<p>
				{cell.startTime} - {cell.endTime} | {cell.status} | {cell.additionalStatus}
			</p>
			<br />
			<p>
				{cell.flightModel} | {cell.bodyType} | {cell.type} | {cell.timeStatus}
			</p>
		</div>
	);
};

const weightAndVolumeFormatter = (cell) => {
	return (
		<div>
			<p>{cell.percentage}</p>
			<br />
			<p>{cell.value}</p>
		</div>
	);
};

const positionFormatter = (cell) => {
	return cell.map((positions, index) => {
		return (
			<div key={index}>
				<p>
					{positions.position} {positions.value}
				</p>
			</div>
		);
	});
};

const revenueFormatter = (cell) => {
	return (
		<div>
			<p>{cell.revenue}</p>
			<br />
			<p>{cell.yeild}</p>
		</div>
	);
};

const bookingFormatter = (cell) => {
	return (
		<div>
			<p>{cell.sr}</p>
			<br />
			<p>{cell.volume}</p>
		</div>
	);
};

const rowStyle = (row, rowIndex) => {
	return { wordBreak: "break-all" };
};

const expandRow = {
	renderer: (row) => (
		<div>
			<p>{`Expanded content goes here`}</p>
		</div>
	),
};

const customFlightFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.flight.date.toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.flight.flightno.toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customDetailsFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.details.flightModel.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.bodyType.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.type.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.startTime.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.endTime.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.status.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.additionalStatus.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.timeStatus.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customWeightFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.weight.percentage.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.weight.value.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customVolumeFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.volume.percentage.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.volume.value.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customRevenueFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.revenue.revenue.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.revenue.yeild.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customSrFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.sr.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customQueuedBookingFilter = (filterVal, data) => {
	if (filterVal) {
		return data.filter((travel) =>
			travel.queuedBooking.sr.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.queuedBooking.volume.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return data;
};

const customDataUldFilter = (filterVal, data) => {
	//debugger
	if (filterVal) {

		var uldvalues;
		data.filter(function(travel) {
			uldvalues = travel.uldPositions
			let index = -1;
			uldvalues.filter(function(values) {
				var searchVal = values.position.toString().toLowerCase() + ' '+ values.value.toString().toLowerCase();
				if(searchVal.includes(filterVal.toLowerCase()))
					index = 1;
			  })
			  if(index >-1)
				return uldvalues;
		  });

		
		/*data.filter((travel) =>{
				console.log(travel.uldPositions)
				uldvalues = travel.uldPositions
				var index = uldvalues.findIndex(values => 
						values.position.toString().toLowerCase() === (filterVal.toLowerCase()) ||
						values.value.toString().toLowerCase() === (filterVal.toLowerCase())
					);

				console.log(index);
				if(index >-1)
					return uldvalues
			}
		);*/
	}
	return data;
};

/*function onColumnMatch({ filterVal, value, column, row }) {
	debugger
	if (filterVal) {
		return value.filter((travel) =>
			travel.flight.date.toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.flight.flightno.toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.flightModel.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.bodyType.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.type.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.startTime.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.endTime.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.status.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.additionalStatus.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.details.timeStatus.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.weight.percentage.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.weight.value.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.volume.percentage.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.volume.value.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.revenue.revenue.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.revenue.yeild.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.sr.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.queuedBooking.sr.toString().toLowerCase().includes(filterVal.toLowerCase()) ||
			travel.queuedBooking.volume.toString().toLowerCase().includes(filterVal.toLowerCase())
		);
	}
	return value;
}*/

function customMatchFunc({
	filterVal,
	value,
	column,
	row
  }) {
	if (typeof value !== 'undefined') {
		if (filterVal) {
			return value.filter((travel) =>
				travel.flight.date.toLowerCase().includes(filterVal.toLowerCase()) ||
				travel.flight.flightno.toLowerCase().includes(filterVal.toLowerCase())
			);
		}
	}
	return false;
  }

const App = () => {
	const airports = ["FRA", "DXB", "AAA", "BBB", "CCC", "DDD", "EEE", "FFF"];
	const columns = [
		{
			dataField: "flight",
			text: "Flight",
			formatter: flightFormatter,
			filter: textFilter({
				onFilter: customFlightFilter,
			}),
			editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
				<FlightEdit {...editorProps} value={value} />
			),
		},
		{
			dataField: "segment",
			text: "Segment",
			formatter: segmentFormatter,
			filter: textFilter(),
			editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
				<SegmentEdit {...editorProps} value={value} airports={airports} />
			),
		},
		{ dataField: "details", text: "Details", formatter: detailsFormatter, filter: textFilter(),
		 editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
				<DetailsEdit {...editorProps} value={value} />
			),
		},
		{ dataField: "weight", text: "Weight", formatter: weightAndVolumeFormatter, filter: textFilter(),
		editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
			<WeightEdit {...editorProps} value={value} />
		) },
		{ dataField: "volume", text: "Volume", formatter: weightAndVolumeFormatter, filter: textFilter(),
		editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
			<VolumeEdit {...editorProps} value={value} />
		) },
		{ dataField: "uldPositions", text: "ULD Positions", formatter: positionFormatter, filter: textFilter(),
		// editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
		// 	<UldPositionsEdit {...editorProps} value={value} />
		// )
	},
		{ dataField: "revenue", text: "Revenue/Yield", formatter: revenueFormatter, filter: textFilter(),
		editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
			<RevenueEdit {...editorProps} value={value} />
		)},
		{ dataField: "sr", text: "SR", filter: textFilter() },
		{ dataField: "queuedBooking", text: "Queued Booking", formatter: bookingFormatter, filter: textFilter(),
		editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
			<QueuedBookingEdit {...editorProps} value={value} />
		)},
	];
	const pagination = paginationFactory({
		sizePerPage: 50,
	});

	console.log("JSON Length: " + sampleData.length);

	useEffect(() => {
		$(".react-bootstrap-table thead th").resizable();
	});

	return (
		<div className='App'>
			<Header />
			<ToolkitProvider keyField='travelId' data={sampleData} columns={columns} search={ { customMatchFunc } }>
				{(props) => (
					<div>
						<div className="row m-2 col-md-12 searchArea">
							<div className="col-md-6"><SearchBar {...props.searchProps} className="searchInput" /></div>
						</div>
						<BootstrapTable
							{...props.baseProps}
							expandRow={expandRow}
							rowStyle={rowStyle}
							filter={filterFactory()}
							cellEdit={cellEditFactory({ mode: "dbclick", blurToSave: true })}
							pagination={pagination}
							hover={true}
						/>
					</div>
				)}
			</ToolkitProvider>
		</div>
	);
};

export default App;
