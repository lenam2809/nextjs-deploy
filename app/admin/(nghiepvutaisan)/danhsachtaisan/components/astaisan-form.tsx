"use client";
import { IFormProps } from "@/shared/model";
import { Modal } from "@/shared/components/modal";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { TanetInput, TanetSelectTreeCheck, TanetCheckbox, TanetTextArea, TanetSelect, SelectAsync, TanetFormDate, TanetCKEditor, UploadFile } from "@/lib";
import { useEffect, useState,useReducer } from "react";
import { array, number, object, ref, string,date } from "yup";
import { asTaiSanServices } from "../services";
import { formReducer,INITIAL_STATE_FORM,computedTitle } from "@/lib/common";
export default function AsTaiSanForm({
  show,
  action,
  id,
  onClose,
}: IFormProps) {
  const titleTable="Danh mục tài sản";  
  const dataDefault = {
        donViId: null,
    maDonVi: '',
    phongBanChiuPhiId: null,
    phongBanQuanLyId: null,
    soTheTaiSan: '',
    tenTaiSan: '',
    loaiTaiSanId: null,
    nhomTaiSanId: null,
    maNhomTaiSan: '',
    ngayNhapThongTin: null,
    ngaySuDung: null,
    maDiaBan: null,
    diaChi: '',
    viTri: '',
    maMucDich: null,
    thoiHanSuDung: null,
    maNguonGoc: null,
    trangThaiSuDung: null,
    nguyenGia: null,
    giaTriConLai: null,
    thoiGianKhauHao: null,
    giaTriKhauHao: null,
    dienTich: null,
    dienTichSanXayDung: null,
    htCoSoSxKd: null,
    htLamNhaO: null,
    htChoThue: null,
    htBoTrong: null,
    htBiLanChiem: null,
    htKhac: null,
    htSuDungChung: false,
    dtSuDungChung: null,
    htSuDungRieng: false,
    dtSuDungRieng: null,
    daDauTuXd: false,
    dtDaDauTuXd: null,
    dangDauTuXd: false,
    dtDangDauTuXd: null,
    chuanBiDauTuXd: false,
    dtChuanBiDauTuXd: null,
    trongChuaSuDung: false,
    dtTrongChuaSuDung: null,
    thoiDiemCoPhanHoa: null,
    paSdDuocDuyet: null,
    tinhTrangPasx: null,
    pasxDuocDuyet: null,
    coHoSoTaiSan: false,
    ttHoSoPhapLy: null,
    soTang: null,
    matTien: null,
    chieuSau: null,
    capCongTrinh: null,
    ghiChu: '',
    daGiam: false,
    ngayGiam: null,
    daTinhSoLieu: false,
    loaiTaiSanGoc: null,
  };
  const schema = object({
        donViId: number().nullable(),
    maDonVi: string().trim().nullable(),
    phongBanChiuPhiId: number().nullable(),
    phongBanQuanLyId: number().nullable(),
    soTheTaiSan: string().trim().nullable().max(250, 'Bạn nhập tối đa 250 ký tự'),
    tenTaiSan: string().trim().nullable().max(1000, 'Bạn nhập tối đa 1000 ký tự'),
    loaiTaiSanId: number().nullable(),
    nhomTaiSanId: number().nullable(),
    maNhomTaiSan: string().trim().nullable().max(250, 'Bạn nhập tối đa 250 ký tự'),
    ngayNhapThongTin: date().nullable(),
    ngaySuDung: date().nullable(),
    maDiaBan: number().nullable(),
    diaChi: string().trim().nullable().max(1000, 'Bạn nhập tối đa 1000 ký tự'),
    viTri: string().trim().nullable().max(1000, 'Bạn nhập tối đa 1000 ký tự'),
    maMucDich: number().nullable(),
    thoiHanSuDung: number().nullable(),
    maNguonGoc: number().nullable(),
    trangThaiSuDung: number().nullable(),
    nguyenGia: number().nullable(),
    giaTriConLai: number().nullable(),
    thoiGianKhauHao: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    giaTriKhauHao: number().nullable(),
    dienTich: number().nullable(),
    dienTichSanXayDung: number().nullable(),
    htCoSoSxKd: number().nullable(),
    htLamNhaO: number().nullable(),
    htChoThue: number().nullable(),
    htBoTrong: number().nullable(),
    htBiLanChiem: number().nullable(),
    htKhac: number().nullable(),
    dtSuDungChung: number().nullable(),
    dtSuDungRieng: number().nullable(),
    dtDaDauTuXd: number().nullable(),
    dtDangDauTuXd: number().nullable(),
    dtChuanBiDauTuXd: number().nullable(),
    dtTrongChuaSuDung: number().nullable(),
    thoiDiemCoPhanHoa: number().nullable(),
    paSdDuocDuyet: number().nullable(),
    tinhTrangPasx: number().nullable(),
    pasxDuocDuyet: number().nullable(),
    ttHoSoPhapLy: number().nullable(),
    soTang: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    matTien: number().nullable(),
    chieuSau: number().nullable(),
    capCongTrinh: number().nullable(),
    ghiChu: string().trim().nullable(),
    ngayGiam: date().nullable(),
    loaiTaiSanGoc: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
  });    
  const [state,dispatch] = useReducer(formReducer,INITIAL_STATE_FORM);
  const { data, error, isLoading, mutate } = asTaiSanServices.GetById(id!);
  const { data:dataDonVis }=asTaiSanServices.GetDonVi()
const { data:dataPhongBanChiuPhis }=asTaiSanServices.GetPhongBanChiuPhi()
const { data:dataPhongBanQuanLys }=asTaiSanServices.GetPhongBanQuanLy()
const { data:dataLoaiTaiSans }=asTaiSanServices.GetLoaiTaiSan()
const { data:dataNhomTaiSans }=asTaiSanServices.GetNhomTaiSan()
const { data:dataMaDiaBans }=asTaiSanServices.GetMaDiaBan()
const { data:dataMaMucDichs }=asTaiSanServices.GetMaMucDich()
const { data:dataThoiHanSuDungs }=asTaiSanServices.GetThoiHanSuDung()
const { data:dataMaNguonGocs }=asTaiSanServices.GetMaNguonGoc()
const { data:dataTrangThaiSuDungs }=asTaiSanServices.GetTrangThaiSuDung()
const { data:dataThoiDiemCoPhanHoas }=asTaiSanServices.GetThoiDiemCoPhanHoa()
const { data:dataPaSdDuocDuyets }=asTaiSanServices.GetPaSdDuocDuyet()
const { data:dataTinhTrangPasxs }=asTaiSanServices.GetTinhTrangPasx()
const { data:dataPasxDuocDuyets }=asTaiSanServices.GetPasxDuocDuyet()
const { data:dataTtHoSoPhapLys }=asTaiSanServices.GetTtHoSoPhapLy()
const { data:dataCapCongTrinhs }=asTaiSanServices.GetCapCongTrinh()
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: any) => {
    setLoading(true);
    if (id) {
      try {
        await asTaiSanServices.update(id, values);
        toast.success("Cập nhật thành công");
        await mutate();
        await onClose(true);
      } catch (err: any) {
        toast.error("Cập nhật không thành công");
      }
    } else {
      try {
        await asTaiSanServices.create(values);
        toast.success("Thêm thành công");
        await mutate();
        await onClose(true);
      } catch (err: any) {
        toast.error("Thêm mới không thành công");
      }
    }
    setLoading(false);
  };
   useEffect(() => {
    dispatch({type:action});
  }, [action, id]);
  return (
    <>
      <Modal show={show} size="xl" loading={loading}>
        <Formik
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={schema}
          initialValues={data ? data : dataDefault}
          enableReinitialize={true}
        >
          {({ handleSubmit}) => (
          <Form noValidate
          onSubmit={handleSubmit}
          onKeyPress={(ev) => {
            ev.stopPropagation();
          }}>
            <Modal.Header onClose={onClose}>{computedTitle(id,state?.editMode, titleTable)}</Modal.Header>
            <Modal.Body nameClass="grid-cols-12">
               <div className='col-span-6'>
	<TanetSelect
	label='Mã/Tên chi nhánh quản lý'
	required={false}
	view={state?.viewMode}
	id='donViId'
	name='donViId'
	options ={ dataDonVis}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Mã/Tên chi nhánh quản lý'
	required={false}
	view={state?.viewMode}
	id='maDonVi'
	name='maDonVi'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Phòng ban chịu phí'
	required={false}
	view={state?.viewMode}
	id='phongBanChiuPhiId'
	name='phongBanChiuPhiId'
	options ={ dataPhongBanChiuPhis}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Phòng ban quản lý tài sản'
	required={false}
	view={state?.viewMode}
	id='phongBanQuanLyId'
	name='phongBanQuanLyId'
	options ={ dataPhongBanQuanLys}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số thẻ/Tên tài sản'
	required={false}
	view={state?.viewMode}
	id='soTheTaiSan'
	name='soTheTaiSan'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số thẻ/Tên tài sản'
	required={false}
	view={state?.viewMode}
	id='tenTaiSan'
	name='tenTaiSan'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Loại tài sản'
	required={false}
	view={state?.viewMode}
	id='loaiTaiSanId'
	name='loaiTaiSanId'
	options ={ dataLoaiTaiSans}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Mã/Tên nhóm tài sản'
	required={false}
	view={state?.viewMode}
	id='nhomTaiSanId'
	name='nhomTaiSanId'
	options ={ dataNhomTaiSans}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Mã/Tên nhóm tài sản'
	required={false}
	view={state?.viewMode}
	id='maNhomTaiSan'
	name='maNhomTaiSan'
	/></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày nhập tài sản'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngayNhapThongTin'
	name='ngayNhapThongTin'
	/></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày đưa vào sử dụng'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngaySuDung'
	name='ngaySuDung'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Địa chỉ'
	required={false}
	view={state?.viewMode}
	id='maDiaBan'
	name='maDiaBan'
	options ={ dataMaDiaBans}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số nhà/ngõ xóm'
	required={false}
	view={state?.viewMode}
	id='diaChi'
	name='diaChi'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Vị trí'
	required={false}
	view={state?.viewMode}
	id='viTri'
	name='viTri'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Mục đích sử dụng'
	required={false}
	view={state?.viewMode}
	id='maMucDich'
	name='maMucDich'
	options ={ dataMaMucDichs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Thời hạn sử dụng'
	required={false}
	view={state?.viewMode}
	id='thoiHanSuDung'
	name='thoiHanSuDung'
	options ={ dataThoiHanSuDungs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Nguồn gốc sử dụng đất'
	required={false}
	view={state?.viewMode}
	id='maNguonGoc'
	name='maNguonGoc'
	options ={ dataMaNguonGocs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Trạng thái sử dụng'
	required={false}
	view={state?.viewMode}
	id='trangThaiSuDung'
	name='trangThaiSuDung'
	options ={ dataTrangThaiSuDungs}
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetInput
	label='Thời gian khấu hao'
	required={false}
	view={state?.viewMode}
	type='number'
	id='thoiGianKhauHao'
	name='thoiGianKhauHao'
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='htSuDungChung'
	name='htSuDungChung'
	>Sử dụng chung</TanetCheckbox></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='htSuDungRieng'
	name='htSuDungRieng'
	>Sử dụng riêng</TanetCheckbox></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='daDauTuXd'
	name='daDauTuXd'
	>Đã đầu tư xây dựng</TanetCheckbox></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='dangDauTuXd'
	name='dangDauTuXd'
	>Đang đầu tư xây dựng</TanetCheckbox></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='chuanBiDauTuXd'
	name='chuanBiDauTuXd'
	>Chuẩn bị đầu tư xây dựng</TanetCheckbox></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='trongChuaSuDung'
	name='trongChuaSuDung'
	>Đất trống, chưa sử dụng</TanetCheckbox></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetSelect
	label='Thời điểm cổ phần hóa'
	required={false}
	view={state?.viewMode}
	id='thoiDiemCoPhanHoa'
	name='thoiDiemCoPhanHoa'
	options ={ dataThoiDiemCoPhanHoas}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='PA sử dụng được HĐQT duyệt'
	required={false}
	view={state?.viewMode}
	id='paSdDuocDuyet'
	name='paSdDuocDuyet'
	options ={ dataPaSdDuocDuyets}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Tình trạng phê duyệt PASX'
	required={false}
	view={state?.viewMode}
	id='tinhTrangPasx'
	name='tinhTrangPasx'
	options ={ dataTinhTrangPasxs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='PASX được phê duyệt'
	required={false}
	view={state?.viewMode}
	id='pasxDuocDuyet'
	name='pasxDuocDuyet'
	options ={ dataPasxDuocDuyets}
	/></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='coHoSoTaiSan'
	name='coHoSoTaiSan'
	>Thông tin hồ sơ tài sản</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetSelect
	label='Trạng thái hồ sơ pháp lý'
	required={false}
	view={state?.viewMode}
	id='ttHoSoPhapLy'
	name='ttHoSoPhapLy'
	options ={ dataTtHoSoPhapLys}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số tầng'
	required={false}
	view={state?.viewMode}
	type='number'
	id='soTang'
	name='soTang'
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetSelect
	label='Cấp công trình'
	required={false}
	view={state?.viewMode}
	id='capCongTrinh'
	name='capCongTrinh'
	options ={ dataCapCongTrinhs}
	/></div>
<div className='col-span-6'>
	<TanetTextArea
	label='Ghi chú'
	required={false}
	view={state?.viewMode}
	rows={3}
	id='ghiChu'
	name='ghiChu'
	/></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='daGiam'
	name='daGiam'
	>Đánh dấu là đã giảm</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày giảm'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngayGiam'
	name='ngayGiam'
	/></div>
<div className='col-span-4'>
	<TanetCheckbox
	view={state?.viewMode}
	id='daTinhSoLieu'
	name='daTinhSoLieu'
	>Đánh dấu tình trạng tính số liệu</TanetCheckbox></div>
<div className='col-span-4'>
	<TanetInput
	label='Loại tài sản gốc'
	required={false}
	view={state?.viewMode}
	type='number'
	id='loaiTaiSanGoc'
	name='loaiTaiSanGoc'
	/></div>
            </Modal.Body>
            <Modal.Footer onClose={onClose}>
              {!state?.viewMode ? (
                <>
                  <button
                    data-modal-hide="large-modal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Lưu
                  </button>
                </>
              ) : (
                <></>
              )}
            </Modal.Footer>
          </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
