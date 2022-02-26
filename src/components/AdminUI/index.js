import {Component} from 'react'
import {BiEdit} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'

import ReactPaginate from 'react-paginate'
import Popup from 'reactjs-popup'
import Loader from 'react-loader-spinner'

import './index.css'

const DetailsUI = props => {
  const {
    eachDetail,
    onCheckingUserCheckbox,
    onRemovingUserDetail,
    onUpdatingName,
    savingDetails,
    showErrormsg,
    editingLoadingStatus,
    onUpdatingEmail,
    onupdatingRole,
  } = props
  const {id, name, email, role, isChecked} = eachDetail

  const handlingUserCheckbox = () => {
    onCheckingUserCheckbox(id)
  }
  const removingUserDetail = () => {
    onRemovingUserDetail(id)
  }
  const updatingName = event => {
    onUpdatingName(event.target.value)
  }
  const updatingEmail = event => {
    onUpdatingEmail(event.target.value)
  }
  const updatingRole = event => {
    onupdatingRole(event.target.value)
  }
  const onSavingDetails = () => {
    savingDetails(id)
  }

  return (
    <div className={isChecked ? 'header checked-box' : 'header'}>
      <input
        onChange={handlingUserCheckbox}
        checked={isChecked}
        className="chekbox-style"
        type="checkbox"
      />
      <p className="headings">{name}</p>
      <p className="headings email">{email}</p>
      <p className="headings">{role}</p>
      {editingLoadingStatus ? (
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              <BiEdit className="icon-style" />
            </button>
          }
        >
          {close => (
            <div className="popup-background">
              <>
                <button
                  type="button"
                  className="save-button close-button"
                  onClick={() => close()}
                >
                  x
                </button>
                <div className="inputs-bg">
                  <p className="successfull-updation">
                    Details Saved Successfully
                  </p>
                </div>
              </>
            </div>
          )}
        </Popup>
      ) : (
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              <BiEdit className="icon-style" />
            </button>
          }
        >
          {close => (
            <div className="popup-background">
              <>
                <button
                  type="button"
                  className="save-button close-button"
                  onClick={() => close()}
                >
                  X
                </button>
                <div className="inputs-bg">
                  <label className="label-element" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pop-up-inputs"
                    placeholder="Enter Name"
                    onChange={updatingName}
                    id="name"
                    type="text"
                  />
                  <label className="label-element" htmlFor="Email">
                    Email
                  </label>
                  <input
                    onChange={updatingEmail}
                    className="pop-up-inputs"
                    placeholder="Enter Email"
                    id="Email"
                    type="text"
                  />
                  <label className="label-element" htmlFor="Role">
                    Role
                  </label>
                  <input
                    onChange={updatingRole}
                    className="pop-up-inputs"
                    placeholder="Enter your Role"
                    id="Role"
                    type="text"
                  />
                </div>
                <button
                  className="save-button"
                  type="button"
                  onClick={onSavingDetails}
                >
                  Save Your Details
                </button>
                {showErrormsg ? (
                  <p className="error-message">Enter All Details</p>
                ) : (
                  ''
                )}
              </>
            </div>
          )}
        </Popup>
      )}
      <button
        type="button"
        className="trigger-button"
        onClick={removingUserDetail}
      >
        <AiOutlineDelete className="icon-style delete-icon-style" />
      </button>
    </div>
  )
}

class LoginPageCopy extends Component {
  state = {
    headerCheckBox: false,
    details: [],
    searchInput: '',
    loadingStatus: false,
    editingLoadingStatus: false,
    showErrormsg: false,
    nameInput: '',
    emailInput: '',
    roleInput: '',
    pageCount: 0,
    itemOffset: 0,
  }

  componentDidMount = async () => {
    this.gettingUserDetails()
    // this.paginatingItems()
  }

  onCheckingUserCheckbox = id => {
    this.setState(prevState => ({
      details: prevState.details.map(eachDetail => {
        if (eachDetail.id === id) {
          return {...eachDetail, isChecked: !eachDetail.isChecked}
        }
        return eachDetail
      }),
    }))
  }

  onRemovingUserDetail = id => {
    this.setState({loadingStatus: true})
    this.setState(prevState => ({
      details: prevState.details.filter(eachDetail => eachDetail.id !== id),
      loadingStatus: false,
    }))
  }

  gettingUserDetails = async () => {
    this.setState({loadingStatus: true})
    const url =
      ' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = data.map(eachDetail => ({
      name: eachDetail.name,
      role: eachDetail.role,
      email: eachDetail.email,
      isChecked: false,
      id: eachDetail.id,
    }))

    const newpagecount = Math.ceil(formattedData.length / 10)

    this.setState({
      details: formattedData,
      pageCount: newpagecount,
      loadingStatus: false,
    })

    // this.setState({details: formattedData})
  }

  handlingHeaderCheckbox = () => {
    const {headerCheckBox, details, itemOffset} = this.state
    const pageItems = details.slice(itemOffset, itemOffset + 10)
    const itemsUptoOffset = details.slice(0, itemOffset)
    const itemsafterEndOffset = details.slice(itemOffset + 10, details.length)

    const selectedItems = headerCheckBox
      ? pageItems.map(eachDetail => ({
          name: eachDetail.name,
          role: eachDetail.role,
          email: eachDetail.email,
          isChecked: false,
          id: eachDetail.id,
        }))
      : pageItems.map(eachDetail => ({
          name: eachDetail.name,
          role: eachDetail.role,
          email: eachDetail.email,
          isChecked: true,
          id: eachDetail.id,
        }))
    this.setState({
      details: [...itemsUptoOffset, ...selectedItems, ...itemsafterEndOffset],
      headerCheckBox: !headerCheckBox,
    })
  }

  headerdesign = () => {
    const {headerCheckBox} = this.state

    return (
      <>
        <div className="top-header ">
          <input
            onChange={this.handlingHeaderCheckbox}
            checked={headerCheckBox}
            className="chekbox-style"
            type="checkbox"
          />
          <p className="top-headings">Name</p>
          <p className="top-headings email">Email</p>
          <p className="top-headings">Role</p>
          <p className="top-headings">Actions</p>
        </div>
      </>
    )
  }

  deletingSelected = () => {
    const {details} = this.state
    const updatedDetails = details.filter(
      eachDetail => eachDetail.isChecked !== true,
    )
    const newpagecount = Math.ceil(updatedDetails.length / 10)
    this.setState({
      details: updatedDetails,
      pageCount: newpagecount,
      headerCheckBox: false,
    })
  }

  searching = event => {
    this.setState({searchInput: event.target.value})
  }

  loadingUI = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  onUpdatingName = name => {
    this.setState({nameInput: name, showErrormsg: false})
  }

  onUpdatingEmail = email => {
    this.setState({emailInput: email, showErrormsg: false})
  }

  onupdatingRole = role => {
    this.setState({roleInput: role, showErrormsg: false})
  }

  savingDetails = id => {
    const {nameInput} = this.state
    const {emailInput} = this.state
    const {roleInput} = this.state
    if (roleInput !== '' && nameInput !== '' && emailInput !== '') {
      this.setState(prevState => ({
        details: prevState.details.map(eachDetail => {
          if (eachDetail.id === id) {
            return {
              ...eachDetail,
              name: nameInput,
              email: emailInput,
              role: roleInput,
            }
          }
          return eachDetail
        }),
        showErrormsg: false,
        editingLoadingStatus: true,
      }))
    } else {
      this.setState({showErrormsg: true})
    }
  }

  handlePageClick = event => {
    const {details} = this.state
    const newOffset = (event.selected * 10) % details.length
    this.setState({
      itemOffset: newOffset,
    })
  }

  paginatingItems = () => {
    const {itemOffset, details} = this.state

    const endOffset = itemOffset + 10

    const pageItems = details.slice(itemOffset, endOffset)

    const newpagecount = Math.ceil(details.length / 10)

    this.setState({details: pageItems, pageCount: newpagecount})
  }

  render() {
    const {
      details,
      searchInput,
      loadingStatus,
      editingLoadingStatus,
      showErrormsg,
      pageCount,
      itemOffset,
    } = this.state

    const pageItems = details.slice(itemOffset, itemOffset + 10)

    const sortingByName = pageItems.filter(eachDetail =>
      eachDetail.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const sortingByrole = pageItems.filter(eachDetail =>
      eachDetail.role.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const sortingByEmail = pageItems.filter(eachDetail =>
      eachDetail.email.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const finalDetails = new Set([
      ...sortingByName,
      ...sortingByEmail,
      ...sortingByrole,
    ])
    const items = [...finalDetails]

    return (
      <div className="app-background">
        <input
          placeholder="Search by name, email or role"
          className="search-bar"
          type="search"
          onChange={this.searching}
        />

        {this.headerdesign()}
        <div className="details-bg">
          {loadingStatus
            ? this.loadingUI()
            : items.map(eachDetail => (
                <DetailsUI
                  key={eachDetail.id}
                  eachDetail={eachDetail}
                  onCheckingUserCheckbox={this.onCheckingUserCheckbox}
                  onRemovingUserDetail={this.onRemovingUserDetail}
                  onUpdatingName={this.onUpdatingName}
                  savingDetails={this.savingDetails}
                  editingLoadingStatus={editingLoadingStatus}
                  showErrormsg={showErrormsg}
                  onUpdatingEmail={this.onUpdatingEmail}
                  onupdatingRole={this.onupdatingRole}
                />
              ))}
        </div>

        <button
          className="delete-selected"
          type="button"
          onClick={this.deletingSelected}
        >
          Deleted Selected
        </button>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          disabledClassName="disabled"
        />
      </div>
    )
  }
}

export default LoginPageCopy
